import axios from "axios";

export interface Core {
  core: string;
}

export interface Links {
  patch: { small: string };
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  cores: Core[];
  links: Links;
  payloads: string[];
  success: boolean;
  failures?: { reason: string }[];
}
export interface LaunchWithPayload extends Launch{
  payloadId: string
  payloadType: string
}
export const fetchLaunches = async (): Promise<LaunchWithPayload[]> => {
      const response = await axios.get<Launch[]>('https://api.spacexdata.com/v5/launches');
      const launchesData = response.data.slice(0, 10);
      const launchesWithPayloadInfo = await Promise.all(
        launchesData.map(async (launch) => {
          const payloadId = launch.payloads[0];
          const payloadInfoResponse = await axios.get(`https://api.spacexdata.com/v4/payloads/${payloadId}`);
          const payloadType = payloadInfoResponse.data?.type;
          return { ...launch, payloadId, payloadType };
        })
      );
      return launchesWithPayloadInfo;
  };