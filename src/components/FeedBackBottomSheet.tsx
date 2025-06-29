import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import Settings from "../../assets/icons/Settings.svg";
import { ActionButton } from "./ActionButton";
import { FontSizes } from "@/theme/fontSizes";
import { AppTheme } from "@/theme/colors";

interface FeedBackBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  handleSheetChanges: (index: number) => void;
  feedback: string;
  setFeedback: (value: React.SetStateAction<string>) => void;
  feedbackError: string | null;
  handleSendFeedback: () => void;
}

const FeedBackBottomSheet = (props: FeedBackBottomSheetProps) => {
  const {
    bottomSheetRef,
    handleSheetChanges,
    feedback,
    setFeedback,
    feedbackError,
    handleSendFeedback,
  } = props;

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        index={-1}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: AppTheme.colors.ava_light_purple,
          borderRadius: 25,
          marginHorizontal: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor: AppTheme.colors.ava_light_purple,
        }}
        handleComponent={() => <View style={styles.handleComponentStyle} />}
      >
        <BottomSheetView style={styles.contentContainerSheet}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              marginBottom: 28,
            }}
          >
            <Text style={styles.title}>Give us feedback</Text>
            <Settings width={20} height={20} />
          </View>
          <TextInput
            placeholder="Type here..."
            multiline
            numberOfLines={10}
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: feedbackError ? "red" : "#e5e5e5",
              padding: 12,
              fontSize: 16,
              height: 200,
              textAlignVertical: "top",
              marginBottom: 8,
            }}
          />
          {feedbackError && (
            <Text style={styles.errorTxt}>{feedbackError}</Text>
          )}
          <ActionButton
            title="Send feedback"
            onPress={handleSendFeedback}
            style={{ margin: 20 }}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default FeedBackBottomSheet;

const styles = StyleSheet.create({
  handleComponentStyle: {
    width: 50,
    height: 4,
    backgroundColor: AppTheme.colors.ava_light_purple,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
  },
  errorTxt: {
    color: AppTheme.colors.ava_error,
    marginBottom: 16,
    textAlign: "center",
  },
  title: {
    flex: 1,
    color: AppTheme.colors.ava_text_primary_dark,
    fontWeight: "600",
    fontSize: FontSizes.md,
    textAlign: "center",
  },
  containerSheet: {
    flex: 1,
    zIndex: 1000,
  },
  contentContainerSheet: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: AppTheme.colors.ava_background,
    borderRadius: 25,
  },
});
