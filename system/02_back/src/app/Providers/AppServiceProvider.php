<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\MailService;
use Illuminate\Auth\Notifications\VerifyEmail;
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
                ->subject('メールタイトル')
                ->from('dummy@d.jp')
                ->to($notifiable->email)
                // テキストを選択、ビューと変数を指定できる
                ->text(
                    'email.email_verify_mail', [
                        'email' => $notifiable->email,
                        'url' => $url
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
