<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = auth()->user();
        $userDB = User::find($user->id);

        if ($userDB->deleted_at) {
            return response()->json(['error' => 'Conta já foi apagada anteriormente.'], 200);
        }

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'string|max:255',
                'email' => 'string|email|max:255|unique:users,email,' . $user->id,
                'password' => 'string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            if ($request->has('name')) {
                $userDB->name = $request->input('name');
            }
            if ($request->has('email')) {
                $userDB->email = $request->input('email');
            }
            if ($request->has('password')) {
                $userDB->password = Hash::make($request->input('password'));
            }
            $userDB->save();

            return response()->json(['success' => 'Dados atualizados com sucesso.', 'user' => [
                "id" => $user->id,
                "name" => $userDB->name,
                "email" => $userDB->email,
                "created_at" => $userDB->created_at,
                "updated_at" => $userDB->updated_at,
            ]], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao atualizar os dados.', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
        try {
            $user = auth()->user();
            $userDB = User::find($user->id);

            if ($userDB->deleted_at) {
                return response()->json(['error' => 'Conta já foi apagada anteriormente.'], 200);
            }

            if ($userDB) {
                $userDB->deleted_at = true;
                $userDB->save();
                JWTAuth::invalidate(JWTAuth::getToken());
                return response()->json(['success' => 'Conta apagada com sucesso.'], 200);
            } else {
                return response()->json(['error' => 'Usuário não encontrado.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function search($value = null)
{
    $user = auth()->user();
    if ($user->deleted) {
        return response()->json(['error' => 'Conta deletada.'], 400);
    }

    try {
        $query = User::where(function ($query) use ($value) {
            $query->where('email', 'like', "%$value%")
                  ->orWhere('id', 'like', "%$value%");
        })
        ->where('deleted_at', null);

        $users = $query->paginate(10);

        if ($users->isEmpty()) {
            return response()->json(['error' => 'Conta não encontrada.'], 400);
        }

        $data = $users->items();

        return response()->json([
            'data' => $data,
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage(),
            'per_page' => $users->perPage(),
            'total' => $users->total(),
        ], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}
