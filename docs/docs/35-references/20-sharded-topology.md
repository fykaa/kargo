---
sidebar_label: Sharded Topology
description: Kargo's sharded topology
---

# Kargo's Sharded Topology

One of the key architectural features of Kargo is its sharded topology, which improves scalability, flexibility, and security by distributing components across multiple clusters. This design allows for efficient management of resources and improved isolation between different environments.

This document will provide users with a comprehensive understanding of Kargo’s sharded topology. It will cover the fundamental components involved and the communication flow between these components.

## Key Concepts of Kargo's Sharded Topology

1. **Shards**: In Kargo's sharded topology, each Kubernetes cluster is referred to as a **shard**. Kargo manages these shards independently, allowing for distributed resource management and better scalability. Each shard operates autonomously while still being part of the larger Kargo ecosystem.
1. **Control Plane**: Kargo has a centralized **control plane** that oversees the activities of the Kargo controllers (agents) running in individual clusters (shards). It is responsible for coordinating deployments, managing configurations, and ensuring consistency across the entire system.
1. **Phone Home Model**: Kargo’s architecture follows a "Phone Home" model where each Kargo controller (agent) in a shard communicates back to the centralized control plane, providing a unified, centralized view. This model provides a unified view of the system's state, allowing for real-time updates and monitoring. It facilitates efficient management of resources across multiple clusters through a single-pane of glass.
1. **Kubernetes Clusters**: These are the Kubernetes clusters that Kargo manages through its controllers. Each cluster operates as a shard, executing deployment tasks and synchronizing application resources as directed by the centralized control plane.
1. **Argo CD Control Plane**: Instances of Argo CD run within the sharded clusters to synchronize application resources. The Argo CD control plane is responsible for managing the deployment of applications, ensuring that the desired state defined in Git repositories is reflected in the Kubernetes environment.


## Components Overview
This section provides detailed descriptions of each component in both the **centralized control plane** and the **shards**.

### Centralized Control Plane

**Kargo Resources**: Kargo control-plane creates and manages custom resources related to delivery, promotions, and releases. These resources are essential for defining the lifecycle of applications and their deployments across all shards, allowing for consistent management and tracking.

- **API Server**: The API server is the core component that handles all Kargo-related API requests. It manages and synchronizes Kargo resources across all shards.

- **Management Controller**: This component is responsible for overseeing the overall topology and state of Kargo across multiple clusters. 
It initializes and manages the Kargo controller's operations, ensuring effective communication between the centralized control plane and the Kargo controllers (agents) in each shard. The management controller facilitates resource management and deployment strategies by setting up reconciler components for various Kargo resources, such as namespaces and projects. It also handles configuration management, logging, and the lifecycle of the Kargo controller, ensuring that the desired state of resources is maintained across the entire system.

- **Garbage Collector**: The garbage collector automatically cleans up obsolete Kargo resources in the control plane. By removing unused or outdated resources, it helps maintain system efficiency and reduces clutter, ensuring that the control plane operates smoothly.

- **Rollouts Controller**: 
<!-- The dedicated Kargo rollouts controller coordinates progressive delivery across the shards. It interacts with the Argo CD control planes in each managed cluster to facilitate controlled and monitored rollouts of application updates. -->

### Shards

- **Kargo Controller (Agent)**: The Kargo controller, or agent, runs in each shard and is responsible for communicating with the centralized control plane. It synchronizes Kargo resources and actions specific to its respective shard, ensuring that deployments and configurations are accurately reflected.

  - **Function**: The Kargo controller acts as an agent that executes delivery operations, including deploying new releases, managing promotions, and performing rollouts within its cluster. It ensures that the desired state defined in the control plane is achieved in the shard.

- **Argo CD Control Plane**: Each shard can host an instance of Argo CD, which manages and synchronizes application resources for the workloads running in that cluster.

  - **Argo CD Components**: This includes standard Argo CD components such as the Application Controller, Repo Server, Dex (for authentication), and Server. These components work together to facilitate GitOps workflows, ensuring that the applications deployed in the cluster are in sync with the desired state defined in Git repositories.


## Communication & Synchronization

- **Phone Home Architecture**: Kargo controllers (agents) in each shard communicate back to the Kargo control plane using a secure API. This communication allows the control plane to receive updates on the state of each shard without having direct permissions over sharded clusters. Instead, the control plane coordinates actions through the controllers, ensuring that commands and configurations are executed as intended while maintaining a clear separation of responsibilities.

- **Resource Syncing**: The controllers are responsible for syncing Kargo resources within their respective clusters. This includes monitoring the state of resources and applying any necessary changes to align with the desired state defined in the control plane. Meanwhile, Argo CD handles the synchronization of application resources, ensuring that the applications deployed in the clusters reflect the configurations stored in Git repositories. This dual-layer synchronization enhances the overall reliability and consistency of deployments across the sharded topology.

## Progressive delivery and rollouts
- Dedicated rollouts controller
   - Can coexist
- Promotion workflow
- Stages and freight

## Security Considerations
   - Separation of permissions
   - RBAC and SCM Secrets
   - Potential risks and mitigations

## Deployment & Configuration
   - Step-by-step Guide to deploying Kargo’s sharded topology
   <!-- TODO(fykaa): outline the steps necessary to set up a sharded topology in Kargo, ensuring that users can effectively implement and manage their deployments -->

## Best Practices
- best practices tailored to Kargo’s architecture, such as optimal configurations for the Kargo controller and managing rollouts and promotions

## Troubleshooting
- Common issues
- Logs and monitoring
