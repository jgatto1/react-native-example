import { SafeUnsafe } from 'model/backend/safe-unsafe';

export const SAFE_UNSAFE: { safe_unsafe: SafeUnsafe } = {
  safe_unsafe: {
    description: '',
    id: 333,
    is_safe: true,
    picture_url_512:
      'https://d23e7z9moe8iag.cloudfront.net/eyJidWNrZXQiOiJzZWVraW5nLXNhZmV0eSIsImtleSI6Im1zcF9wb3N0X2ltYWdlL3Byb2R1Y3Rpb24vNzRlMmY3N2UtZTU3My0xMWViLWIwYmMtMTZlMmEzOTc3Yzg3IiwiZWRpdHMiOnsicmVzaXplIjp7IndpdGhvdXRFbmxhcmdlbWVudCI6dHJ1ZSwid2lkdGgiOjUxMiwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciIsImJhY2tncm91bmQiOnsiciI6MCwiZyI6MCwiYiI6MCwiYWxwaGEiOjF9fX19?Expires=1629583639&Signature=LK8sWl2fmiMXfm65OD77pX8s5Giy7kN1Of32OfLdQXVDe2Z4wYrnbgz7h3OuiOEPpUcF2FtV~Y10v40YnjDfs~fRIXMFhusYvrEut~wN7IpO13pTnBSTfvsTYfQ3ezQmCxQTjQgV7q1zcIQxqqtn9fiEDBv7EIm563BHFaB~YP7O4H7UyX~oMfgpi6Wyvsy5HDt7w-Xb4jaQvjQ4ud6lYt59hWNGZpoCai-po-ZkJRd0bUWacvSFZByCwz~PLAN4Gb28sK8mWyo3Zcl56PJtgmm7oc7Fx7tUy4O~MrNrgphuJMbtQ9C1zvwDy0uQ4BIq6ebxCcSRE7ui4aAiB30E5w__&Key-Pair-Id=APKAJ3F76DIQ2Y2KS2MA',
    user_uuid: 'dc27720c-b99f-11eb-b0b9-16e2a3977c87',
  },
};

export const SAFE_UNSAFES: { safe_unsafes: SafeUnsafe[] } = {
  safe_unsafes: [SAFE_UNSAFE.safe_unsafe],
};
