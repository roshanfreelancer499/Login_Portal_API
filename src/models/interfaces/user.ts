export interface CreateUser {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
}

export interface LoginUser {
    userId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    token?: string;
    isActive: boolean;
    createdDate: Date;
    updatedDate: Date;
}