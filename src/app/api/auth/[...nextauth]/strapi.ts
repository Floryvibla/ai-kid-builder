
interface IStrapiSignin {
    provider: string;
    access_token: string;
}
export interface IStrapiUser {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  provider: 'local' | 'google';
};
  
export interface IStrapiLoginResponse {
  jwt: string;
  user: IStrapiUser;
};

export interface IStrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
};

export const strapiSign = async (account: IStrapiSignin) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account.access_token}`;

    const strapiResponse = await fetch(url, { cache: 'no-cache' });

    if (!strapiResponse.ok) {
        const strapiError: IStrapiError = await strapiResponse.json();
        console.log("Strapi Error Response: ", strapiError); // Adicione este log
        throw new Error(strapiError.error.message);
    }

    const strapiLoginResponse: IStrapiLoginResponse = await strapiResponse.json();
    return strapiLoginResponse;
};
