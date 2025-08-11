---
sidebar_label: Slack
description: Slack Notification Channel
---

# Slack

Slack notification channels enable sending messages to Slack channels during promotion workflows.

## Configuration

| Name             | Type     | Required | Description                                                                                                                                                                            |
| ---------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `channelID`      | `string` | Y        | The Slack channel identifier where messages will be sent. Must start with `C` (public channel), `G` (private group), `D` (direct message), or `S` followed by alphanumeric characters. |
| `secretRef`      | `object` | Y        | Reference to a Kubernetes Secret containing the Slack API token.                                                                                                                       |
| `secretRef.name` | `string` | Y        | Name of the Secret containing the Slack API token.                                                                                                                                     |

## Secret Requirements

The referenced Secret must contain the following key:

| Key      | Type     | Required | Description                                    |
| -------- | -------- | -------- | ---------------------------------------------- |
| `apiKey` | `string` | Y        | Slack Bot Token with `chat:write` permissions. |

## Examples

```yaml
apiVersion: ee.kargo.akuity.io/v1alpha1
kind: NotificationChannel
metadata:
  name: slack-alerts
  namespace: kargo-demo
spec:
  slack:
    channelID: <your-slack-channel-id>
    secretRef:
      name: slack-secret
---
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: slack-secret
  namespace: kargo-demo
stringData:
  apiKey: <your-slack-api-token>
```
