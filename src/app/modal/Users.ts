export interface User {
    id?: string;
    uid: string;
    email: string;
    phone: any;
    state: number;
    profile_picture?: any;
    skills: any[];
    first_name: string;
    last_name: string;
    name: string;
    token?: string;
    portfolio: IPortfolio[];
    type: string;
    bio: string;
    last_updated_payments?: string;
    stripe_customer_id?: string;
    stripe_connect_id?: string;
    payment_source?: boolean;
    stripe_status?: number;
}


export interface IPortfolio {
    id: string;
    time: any;
    url: string;
}
