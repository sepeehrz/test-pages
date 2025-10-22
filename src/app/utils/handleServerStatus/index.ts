// import {Toast} from '../toast';

export class HandleStatus {
  static errorMessages: {[key: number]: string} = {
    401: 'عدم دسترسی به سرویس مورد نظر',
    // 400: 'نحوه ارسال دیتا به سرور صحیح نمیباشد (400)',
    500: 'خطای ناشناخته از سمت سرور'
  };
  static status(
    statusCode: number,
    message: string = '',
    proccessMessage: boolean = true
  ) {
    let handleMessages;
    if (statusCode !== 200) {
      handleMessages = this.errorMessages[statusCode]
        ? this.errorMessages[statusCode]
        : message;
      if (proccessMessage) {
        this.showMessage(handleMessages, statusCode);
      }
    }
    if (statusCode === 200) {
      handleMessages = message;
      if (proccessMessage) {
        this.showMessage(handleMessages, statusCode);
      }
    }
  }
  static showMessage(message: string, statusCode: number) {
    // const $toast = HandleStatus.getToastInstance();
    // if (message && message.length !== 0) {
    //   $toast.showToast({
    //     message: message,
    //     type: statusCode === 200 ? 'success' : 'error'
    //   });
    // }
  }

  //   private static toastInstance: Toast;

  //   private static getToastInstance() {
  //     if (!HandleStatus.toastInstance) {
  //       HandleStatus.toastInstance = new Toast();
  //     }
  //     return HandleStatus.toastInstance;
  //   }
}
