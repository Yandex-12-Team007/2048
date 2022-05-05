import {userApi} from 'Api/userApi';
import {updateUser} from 'Store/actionCreators/user';
import IUser, {IUserChangePassword} from 'Interface/IUser';

class UserController {
  public changeProfile(dispatch, model : IUser) {
    return dispatch(updateUser(model));
  }

  public changePassword(dispatch, model : IUserChangePassword) {
    return userApi.changePassword(model);
  }

  public uploadProfileImg(file : File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return userApi.uploadProfileImg(formData);
  }
}

export const userController = new UserController();
