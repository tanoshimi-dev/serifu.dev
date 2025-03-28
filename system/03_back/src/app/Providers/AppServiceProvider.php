<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\MailService;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


//class AppServiceProvider extends ServiceProvider
class AppServiceProvider extends AuthServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // メールアドレス確認メールを変更
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new TextMail)
                ->subject('ユーザー登録を完了させてください')
                ->from('info@serifu.dev')
                ->to($notifiable->email)
                // テキストを選択、ビューと変数を指定できる
                ->text(
                    'email.email_verify', [
                        'email' => $notifiable->email,
                        'url' => $url
                    ]
                );
        });

        // メールアドレス確認メールを変更
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            return (new TextMail)
                ->subject('パスワードリセット')
                ->from('info@serifu.dev')
                ->to($notifiable->email)
                // テキストを選択、ビューと変数を指定できる
                ->text(
                    'email.reset_password', [
                        'email' => $notifiable->getEmailForPasswordReset(),
                        'token' => $token
                    ]
                );

        });        

    }
}


// Mailableをオーバーライドしたクラス
class TextMail extends Mailable {
    use Queueable, SerializesModels;
    public function build() {}
}