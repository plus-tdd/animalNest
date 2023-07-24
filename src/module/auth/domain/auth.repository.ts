export const AUTH_REPOSITORY = "Auth Repository"

export interface AuthRepository {
    findOneByUserAccount(account);
    findOneByUserId(userId)
}