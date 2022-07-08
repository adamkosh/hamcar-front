import {
  LoginOrRegister,
  LogOut,
  ReSendCode,
  ValidateCode,
} from "~/services/auth.service";
import { authStore } from "~/stores/auth.store";

export const useAuth = () => {
  const loading = ref(false);
  const store = authStore();
  const { showToast } = useToast();
  const login = async (phoneNumber: string): Promise<boolean> => {
    loading.value = true;

    var result = await LoginOrRegister(phoneNumber);

    loading.value = false;
    return result.isSuccess;
  };
  const validateCode = async (
    phoneNumber: string,
    code: string
  ): Promise<boolean> => {
    loading.value = true;
    var result = await ValidateCode(phoneNumber, code);
    loading.value = false;
    if (result.isSuccess) {
      store.setLoginData(result.data!);
    }
    return result.isSuccess;
  };
  const reSendCode = async (phoneNumber: string): Promise<boolean> => {
    loading.value = true;

    var result = await ReSendCode(phoneNumber);
    loading.value = false;
    return result.isSuccess;
  };

  const logout = async (): Promise<boolean> => {
    loading.value = true;

    if (store.isLogin == false) {
      loading.value = false;
      showToast("salam");
      return true;
    }
    var result = await LogOut();

    loading.value = false;
    return result.isSuccess;
  };

  return { login, logout, reSendCode, loading };
};
