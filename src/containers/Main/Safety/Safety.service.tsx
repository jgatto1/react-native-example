import { EnabledFeature, EnabledFeaturesRes } from 'model/backend/safety';
import { BackendClient } from 'service/backend-client.service';

class SafetyServiceImpl {
  fetchEnableFeatures(): Promise<EnabledFeature[]> {
    return BackendClient.get<EnabledFeaturesRes>('/enabled_features')
      .then((response) => {
        return SafetyServiceImpl.generateFeaturesData(response.data);
      })
      .catch((err) => {
        throw Error(err);
      });
  }
  markFeatureAsNotNew(featureName: string): Promise<boolean> {
    return BackendClient.put<any>(`/enabled_features/${featureName}/mark_not_new`)
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw Error(err);
      });
  }
  private static generateFeaturesData(data: any): EnabledFeature[] {
    return data.enabled_features;
  }
}

export const SafetyService = new SafetyServiceImpl();
