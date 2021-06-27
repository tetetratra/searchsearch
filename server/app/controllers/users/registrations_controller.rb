# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  prepend_before_action :auth_user_for_new, only: [:new]
  prepend_before_action :auth_user_for_edit, only: [:edit]

  skip_before_action :auth_user, only: [:new, :create]

  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    # super(resource)
    FRONT_HOME_URL
  end

  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    # super(resource)
    FRONT_HOME_URL
  end

  def after_update_path_for(resource)
    FRONT_HOME_URL
  end

  def after_sign_out_path_for(resource)
    FRONT_HOME_URL
  end

  def auth_user_for_new # ログイン済みで /users/sign_in にアクセスするとサーバー側のrootに飛んでしまうため
    redirect_to(FRONT_HOME_URL) if user_signed_in?
  end

  def auth_user_for_edit # ApplicationControllerのbefore_actionのauth_userはなぜか動かなかったのでここでやる
    redirect_to(FRONT_HOME_URL) unless user_signed_in?
  end
end
