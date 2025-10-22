// import {Toast} from '../toast';

export class HandleError {
  static errorMessages: {[key: number]: string} = {
    401: 'عدم دسترسی به سرویس مورد نظر',
    400: 'نحوه ارسال دیتا به سرور صحیح نمیباشد (400)',
    500: 'خطای ناشناخته از سمت سرور'
  };

  static handle(statusCode: number, serverMessage: string = '') {
    // const $toast = HandleError.getToastInstance();
    // const message =
    //   statusCode === 401 || statusCode === 400 || statusCode === 500
    //     ? HandleError.errorMessages[statusCode]
    //     : serverMessage;
    // $toast.showToast({
    //   message: message,
    //   type: 'error'
    // });
  }

  // private static toastInstance: Toast;

  // private static getToastInstance() {
  //   if (!HandleError.toastInstance) {
  //     HandleError.toastInstance = new Toast();
  //   }
  //   return HandleError.toastInstance;
  // }
}
