import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'user',
  OPERATOR = 'operator',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // USER
  .grant(AppRoles.USER)
  .read(['beneficiaries', 'transactions', 'bvb', 'users'])
  .create(['beneficiaries', 'transactions'])
  .update(['beneficiaries', 'users'])
  .delete(['beneficiaries'])
  // OPERATOR
  .grant(AppRoles.OPERATOR)
  .extend(AppRoles.USER)
  .create(['bvb', 'users'])
  .update(['transactions', 'users'])
  .delete(['beneficiaries', 'users']);
