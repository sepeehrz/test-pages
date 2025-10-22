import {AxiosError} from 'axios';
import {Toast} from '../toast';

export class HandleError {
  static handle(error: unknown) {
    const $toast = HandleError.getToastInstance();

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = this.getErrorMessage(status, error);

      $toast.showToast({
        message: message,
        type: 'error'
      });

      return {
        status,
        message
      };
    }

    const message = 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.';
    $toast.showToast({
      message: message,
      type: 'error'
    });

    return {
      status: 0,
      message
    };
  }

  private static getErrorMessage(status?: number, error?: AxiosError): string {
    if (!status) return 'ارتباط با سرور برقرار نشد.';

    switch (status) {
      case 400:
        return 'درخواست شما معتبر نیست.';
      case 401:
        return 'دسترسی غیرمجاز! لطفاً دوباره وارد شوید.';
      case 403:
        return 'شما اجازه دسترسی به این بخش را ندارید.';
      case 404:
        return 'منبع مورد نظر پیدا نشد.';
      case 408:
        return 'زمان درخواست به پایان رسید.';
      case 500:
        return 'خطای داخلی سرور.';
      case 502:
        return 'مشکل در ارتباط با سرور.';
      case 503:
        return 'سرور در دسترس نیست.';
      default:
        return error?.message || 'خطایی غیرمنتظره رخ داده است.';
    }
  }
  private static toastInstance: Toast;

  private static getToastInstance() {
    if (!HandleError.toastInstance) {
      HandleError.toastInstance = new Toast();
    }
    return HandleError.toastInstance;
  }
}
