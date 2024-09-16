import React, { useEffect, useRef, useState } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { EventRegister } from 'react-native-event-listeners';
import {
  BookmarkItemBottomSheetEvent,
  Events,
  PostBookmarkBottomSheetEvent,
  PostCommentsBottomSheetEvent,
} from '@types';
import { globalHelpers } from '@utils/globalHelpers';
import { SecureStore } from '@services';
import { StorageKeys } from '@globals';
import { View } from './base/view';
import { CameraReminderModal } from './bottomSheets/cameraReminderModal';
import { MediaReminderModal } from './bottomSheets/mediaReminderModal';

export const GlobalBottomSheets = () => {
  const [commentPostId, setCommentPostId] = useState('');
  const [bookmarkPost, setBookmarkPost] = useState<{ id: string; url: string }>(
    { id: '', url: '' },
  );
  const [bookmarkPostItem, setBookmarkPostItem] = useState<{
    id: string;
    collectionId: string;
  }>({ id: '', collectionId: '' });
  const [addCollectionEnabled, setAddCollectionEnabled] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [mediaPermission, setMediaPermission] = useState(false);

  const postCommentsRef = useRef<BottomSheetModalMethods>(null);
  const postBookmarkRef = useRef<BottomSheetModalMethods>(null);
  const bookmarkItemRef = useRef<BottomSheetModalMethods>(null);

  useEffect(() => {
    const postCommentsSub = EventRegister.on(
      Events.POST_COMMENTS_BOTTOM_SHEET,
      async (data: PostCommentsBottomSheetEvent) => {
        setCommentPostId(data.postId);
        await globalHelpers.wait(100);
        postCommentsRef.current?.present();
      },
    );

    const closeAllCommentsSub = EventRegister.on(
      Events.CLOSE_ALL_BOTTOM_SHEETS,
      async () => {
        postCommentsRef.current?.dismiss();
        bookmarkItemRef.current?.dismiss();
        postBookmarkRef.current?.dismiss();
      },
    );

    const postBookmarkSub = EventRegister.on(
      Events.POST_BOOKMARK_BOTTOM_SHEET,
      async (data: PostBookmarkBottomSheetEvent) => {
        setBookmarkPost({ id: data.postId, url: data.postMediaUrl });
        await globalHelpers.wait(100);
        postBookmarkRef.current?.present();
      },
    );

    const bookmarkItemSub = EventRegister.on(
      Events.BOOKMARK_ITEM_BOTTOM_SHEET,
      async (data: BookmarkItemBottomSheetEvent) => {
        setBookmarkPostItem(data);
        await globalHelpers.wait(100);
        bookmarkItemRef.current?.present();
      },
    );

    const addCollectionSub = EventRegister.on(Events.ADD_COLLECTION, () => {
      setAddCollectionEnabled(true);
    });

    const cameraPermissionSub = EventRegister.on(
      Events.CAMERA_PERMISSION_REMINDER,
      async () => {
        const reminded = await SecureStore.getItem(
          StorageKeys.CAMERA_PERMISSION_REMINDED,
        );
        if (!reminded || reminded !== 'true') {
          setCameraPermission(true);
        }
      },
    );

    const mediaPermissionSub = EventRegister.on(
      Events.MEDIA_PERMISSION_REMINDER,
      async () => {
        const reminded = await SecureStore.getItem(
          StorageKeys.MEDIA_PERMISSION_REMINDED,
        );
        if (!reminded || reminded !== 'true') {
          setMediaPermission(true);
        }
      },
    );

    return () => {
      EventRegister.rm(postCommentsSub as string);
      EventRegister.rm(closeAllCommentsSub as string);
      EventRegister.rm(postBookmarkSub as string);
      EventRegister.rm(bookmarkItemSub as string);
      EventRegister.rm(addCollectionSub as string);
      EventRegister.rm(cameraPermissionSub as string);
      EventRegister.rm(mediaPermissionSub as string);
    };
  }, []);

  return (
    <View>
      {/* {commentPostId.length !== 0 && (
        <PostCommentsBottomSheet
          ref={postCommentsRef}
          postId={commentPostId}
          onDismiss={() => setCommentPostId('')}
        />
      )}

      {bookmarkPost.id.length !== 0 && (
        <PostBookmarkBottomSheet
          ref={postBookmarkRef}
          postId={bookmarkPost.id}
          postMediaUrl={bookmarkPost.url}
          onDismiss={() => setBookmarkPost({ id: '', url: '' })}
          onAddCollection={() => {
            postBookmarkRef.current?.dismiss();
            setAddCollectionEnabled(true);
          }}
        />
      )}

      {bookmarkPostItem.id.length !== 0 && (
        <BookmarkPostsItemBottomSheet
          ref={bookmarkItemRef}
          postId={bookmarkPostItem.id}
          collectionId={bookmarkPostItem.collectionId}
          onDismiss={() => setBookmarkPostItem({ id: '', collectionId: '' })}
        />
      )}

      <AddCollectionModal
        isVisible={addCollectionEnabled}
        setIsVisible={setAddCollectionEnabled}
      /> */}

      <CameraReminderModal
        isVisible={cameraPermission}
        setIsVisible={setCameraPermission}
      />

      <MediaReminderModal
        isVisible={mediaPermission}
        setIsVisible={setMediaPermission}
      />
    </View>
  );
};
