import React from 'react';
import { Cluster, InfraEnv } from '../../common';
import { APIErrorMixin } from '../api/types';
import { InfraEnvsService } from '../services';

export default function useInfraEnvId(clusterId: Cluster['id']) {
  const [infraEnvId, setInfraEnv] = React.useState<InfraEnv['id']>();
  const [error, setError] = React.useState<APIErrorMixin & Error>();
  React.useEffect(() => {
    const findInfraEnvId = async () => {
      try {
        const infraEnvId = await InfraEnvsService.getInfraEnvId(clusterId);
        setInfraEnv(infraEnvId);
      } catch (e) {
        setError(e);
      }
    };
    if (!infraEnvId) {
      void findInfraEnvId();
    }
  }, [clusterId, infraEnvId]);

  return { infraEnvId, error };
}