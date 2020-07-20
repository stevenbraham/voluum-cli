import VoluumApiSettings from "./VoluumApiSettings";
import axios, {AxiosResponse} from "axios";
import {Dayjs} from "dayjs";

export interface SessionKey {
    token: string;
    expirationTimestamp: string;
    inaugural: boolean;
}

export interface TotalStats {
    advertiserCost: number;
    ap: number;
    clicks: number;
    conversions: number;
    cost: number;
    cpv: number;
    cr: number;
    ctr: number;
    cv: number;
    ecpa: number;
    ecpc: number;
    ecpm: number;
    epc: number;
    epv: number;
    errors: number;
    ictr: number;
    impressions: number;
    integratedCost: number;
    intermediateClicks: number;
    profit: number;
    revenue: number;
    roi: number;
    rpm: number;
    uniqueVisits: number;
    visits: number;
}

export default class VoluumApi {
    private readonly __authSettings: VoluumApiSettings;

    private __sessionKey: SessionKey | null = null;

    constructor(_authSettings: VoluumApiSettings) {
        this.__authSettings = _authSettings;
    }

    getTotalStats(startDate: Dayjs, endDate: Dayjs): Promise<TotalStats> {
        return new Promise<TotalStats>((resolve, reject) => {
            this.doApiCall("report", {
                include: "ALL",
                groupBy: "offer",
                limit: 1,
                from: startDate.format("YYYY-MM-DD"),
                to: endDate.format("YYYY-MM-DD")
            }).then((response) => {
                resolve(response.data.totals);
            }).catch(error => reject(error));
        });

    }

    doApiCall(endpoint: string, parameters: Object = {}): Promise<AxiosResponse> {
        return new Promise<AxiosResponse>(((resolve, reject) => {
            this.getSessionKey().then((sessionKey) => {
                axios.get("https://api.voluum.com/".concat(endpoint), {
                    headers: {"cwauth-token": sessionKey.token},
                    params: parameters
                }).then((response) => resolve(response)
                ).catch((error) => reject(error));
            });
        }));
    }

    /**
     * if the current session key is missing or invalid, a new one will be retrieved
     * Retrieves an initial access token based on our client ID
     * @see https://developers.voluum.com/#!/authentication
     */
    getSessionKey(): Promise<SessionKey> {
        return new Promise<SessionKey>((resolve, reject) => {
            if (this.__sessionKey !== null) {
                return resolve(this.__sessionKey);
            } else {
                axios.post("https://api.voluum.com/auth/access/session", this.__authSettings
                ).then((response) => {
                    this.__sessionKey = response.data;
                    return resolve(response.data);
                }).catch((error) => reject(error));
            }

        })
    }

}