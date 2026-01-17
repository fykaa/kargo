<span class="tag professional"></span>
<span class="tag beta"></span>
# Notification Channels

Notification channels are custom resources that define a destination for sending
notifications from Kargo to external platforms.

- `NotificationChannel`: Namespace-scoped resources that can only be used within the
same namespace as your Kargo project
- `ClusterNotificationChannel`: Cluster-scoped resources that can be shared across
multiple projects and namespaces

Notification Channels contain configuration details such as:

* Platform-specific settings (Slack channel IDs, webhook URLs, etc.)
* A reference to a Kubernetes `Secret` resource containing authentication credentials

:::note
The location of `Secret` depends on the type of notification channel you are using:

- For `NotificationChannel`s, the `Secret` resource must be in the same namespace as
the notification channel.
- For `ClusterNotificationChannel`, the `Secret` resource must be in the namespace
specified by the `CLUSTER_SECRETS_NAMESPACE` environment variable.
:::

Below is an index of documentation for the specific communication platforms currently
supported by the Notification Channel for sending notifications.

import DocCardList from '@theme/DocCardList';

<DocCardList />
