import {userApi} from 'Api/userApi';
import IUser, {IUserChangePassword} from 'Interface/IUser';

class UserController {
  public changeProfile(model : IUser) {
    return userApi.changeProfile(model);
  }

  public changePassword(model : IUserChangePassword) {
    return userApi.changePassword(model);
  }

  public uploadProfileImg(file : File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return userApi.uploadProfileImg(formData);
  }
}

export const userController = new UserController();
