import type { IMessage } from 'element-plus/lib/el-message/src/types'; //引入类型文件

declare global {
	interface Window {
		$message: IMessage;
	}
}
