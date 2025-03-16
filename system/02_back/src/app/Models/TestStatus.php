<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\TestOrder;

class TestStatus extends Model
{
    use HasFactory;

    protected $table = 'test_status';

    public function status() {
        return $this->hasMany(TestOrder::class, 'status_code', 'status_code');
    }

}
