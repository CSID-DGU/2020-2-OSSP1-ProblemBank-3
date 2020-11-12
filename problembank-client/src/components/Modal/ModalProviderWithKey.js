import createModalProvider from './createModalProvider';
import DeleteModalContent from './ModalContent/DeleteModalContent';

//모달의 내용을 결정하기 위한 상수
export const CONFIRM_DELETE_MODAL = 'confirm_delete';

// 모달의 내용들
const CONTENT_MAP = {
    [CONFIRM_DELETE_MODAL] : DeleteModalContent,
};

export default createModalProvider(CONTENT_MAP);