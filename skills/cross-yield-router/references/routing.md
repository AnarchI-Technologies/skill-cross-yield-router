# Yield routing

Risk profiles:

- `conservative`: preserve a larger liquid reserve and favor native staking over LP exposure.
- `balanced`: keep a default reserve, favor the highest scored route, and cap concentration.
- `aggressive`: allow higher LP or agent-token allocation when its assumed APR is highest.

Scores are APR adjusted by route risk penalty. APR can be observed or assumed. Missing APR routes remain visible but should not win unless the user supplies an override.
