import { apiBaseUrl } from "../config";
import { BioData } from "../state/profile";
import { PowerUp, Purchase } from "../state/store";
import { HttpClient } from "./http";

export class ApiClient extends HttpClient {
  private readonly tokenLocalStorageKey = "api_token";

  protected get token() : string {
    const token = localStorage.getItem(this.tokenLocalStorageKey);

    if (!token) {
      return "";
    }

    return token;
  }

  protected set token(value: string) {
    localStorage.setItem(this.tokenLocalStorageKey, value);
  }

  public get isLoggedIn() : boolean {
    return !!this.token;
  }

  constructor(protected readonly baseUrl: string) {
    super();
  }

  protected get headers() : Headers {
    const headers = super.headers;

    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    return headers;
  }

  public async login(email: string, password: string) : Promise<boolean> {
    try {
      this.token = await this.post<string>(`${this.baseUrl}/users/login`, {
        email,
        password,
      });

      return true;
    } catch {
      // ignore the login error
    }

    return false;
  }

  public async logout() : Promise<void> {
    this.token = "";
  }

  public async signup(email: string, password: string) : Promise<boolean> {
    try {
      return await this.post<boolean>(`${this.baseUrl}/users/signup`, {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }

  public async updateBio(bio: BioData) {
    return await this.put<BioData>(`${this.baseUrl}/bio`, bio);
  }

  public async fetchPowerUps() : Promise<PowerUp[]> {
    return await this.get<PowerUp[]>(`${this.baseUrl}/powerups`);
  }

  public async purchasePowerUp(purchase: Purchase) : Promise<PowerUp[]> {
    return await this.post<PowerUp[]>(`${this.baseUrl}/powerups`, purchase);
  }

  public async usePowerUp(id: string) : Promise<PowerUp[]> {
    return await this.delete<PowerUp[]>(`${this.baseUrl}/powerups/${id}`);
  }

  public async acceptPotentialMatch(email: string) : Promise<string> {
    // TODO: Call API here
    const message = "Potential Match Accepted: " + email;
    console.log(message);
    return message;
  }

  public async rejectPotentialMatch(email: string) : Promise<string> {
    // TODO: Call API here
    const message = "Potential Match Rejected: " + email;
    console.log(message);
    return message;
  }
}

export const api = new ApiClient(apiBaseUrl);
