import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { forwardRef, Ref } from 'react';
import { SharedValue } from 'react-native-reanimated';
import { BottomSheetModal as RNBottomSheetModal } from '@gorhom/bottom-sheet';

interface BottomSheetModalProps {
    snapPoints: (string | number)[] | SharedValue<(string | number)[]>,
    children?: React.ReactNode,
    onDismiss?: () => void
}

export const BottomSheetModal = forwardRef((props: BottomSheetModalProps, ref?: Ref<BottomSheetModalMethods> | undefined) => {
    return (
        <RNBottomSheetModal
            ref={ref}
            onDismiss={props.onDismiss}
            snapPoints={props.snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: "#000" }}
            handleIndicatorStyle={{ backgroundColor: "#fff", width: 80, height: 5 }}
        >
            {props.children}
        </RNBottomSheetModal>
    )
})