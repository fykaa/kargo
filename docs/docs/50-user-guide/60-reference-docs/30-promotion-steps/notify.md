---
sidebar_label: notify
description: Sends notifications to external communication platforms during promotion workflows.
---

<span class="tag professional"></span>
<span class="tag beta"></span>

# `notify`

:::info
This promotion step is only available in Kargo on 
the [Akuity Platform](https://akuity.io/akuity-platform), versions v1.8 and above.
:::

The `notify` promotion step sends messages to external communication platforms
during promotion workflows. This step enables integration with various [notification
channels](../35-notifications/index.md) to keep teams informed about promotion status,
deployments, and other significant events.

## Configuration

| Name           | Type     | Required | Description                                                                                                             |
| -------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `channel`      | `object` | Y        | Reference to a `NotificationChannel` or `ClusterNotificationChannel` resource. For more information, refer to [Notification Channel CRDs](../35-notifications/index.md). |
| `channel.kind` | `string` | Y        | The kind of channel being referenced. Must be either `NotificationChannel` or `ClusterNotificationChannel`.             |
| `channel.name` | `string` | Y        | Name of the `NotificationChannel` or `ClusterNotificationChannel` resource.                                             |
| `message`      | `string` | Y        | The message to send through the notification channel. Supports [expressions](../40-expressions.md) for dynamic content. |

## Output

The `notify` step does not produce any outputs.

## Examples

```yaml
steps:
  - uses: notify
    config:
      message: "Deployment to {{ ctx.stage }} completed successfully!"
      channel:
        kind: NotificationChannel
        name: slack-alerts
```
