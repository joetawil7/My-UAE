import { RequestItem, RequestPromiseType } from '@types';

export class RequestQueue {
  private static readonly queueMap = new Map<string, RequestItem[]>();

  private static readonly returnPromiseMap = new Map<
    string,
    [(value: unknown) => void, (value: unknown) => void]
  >();

  public static async executeInQueue(
    type: RequestPromiseType,
    id: string,
    request: () => Promise<any>
  ): Promise<any> {
    const mapKey = `${type}_${id}`;

    // console.log('request', mapKey);

    const returnPromiseKey = String(new Date().getTime());

    const requestItem: RequestItem = {
      id: returnPromiseKey,
      request,
    };

    if (this.queueMap.has(mapKey)) {
      //   console.log('request added to the queue', mapKey);
      this.queueMap.get(mapKey)?.push(requestItem);
    } else {
      //   console.log('Queue initiated', mapKey);
      this.queueMap.set(mapKey, [requestItem]);
      this.runQueue(mapKey);
      //   console.log('Queue started', mapKey);
    }

    const promise = new Promise((resolve, reject) => {
      this.returnPromiseMap.set(returnPromiseKey, [resolve, reject]);
    });

    return promise;
  }

  private static async runQueue(mapKey: string) {
    const queue = this.queueMap.get(mapKey);

    if (queue && queue.length > 0) {
      const requestItem = queue[0];
      try {
        // console.log('running request', mapKey);
        const response = await requestItem.request();
        // await wait(10000);
        // console.log('request ended successfully', mapKey);

        const promiseMethods = this.returnPromiseMap.get(requestItem.id);
        if (promiseMethods && promiseMethods?.length === 2) {
          promiseMethods[0](response);
        }
      } catch (e) {
        // console.log('request ended with error', mapKey);
        const promiseMethods = this.returnPromiseMap.get(requestItem.id);
        if (promiseMethods && promiseMethods?.length === 2) {
          promiseMethods[1](e);
        }
      }

      this.returnPromiseMap.delete(requestItem.id);

      queue.shift();
      if (queue.length === 0) {
        this.queueMap.delete(mapKey);
        // console.log('queue finished', mapKey);
      } else {
        // console.log('queue moved to next request', mapKey);
        this.runQueue(mapKey);
      }
    }
  }
}
