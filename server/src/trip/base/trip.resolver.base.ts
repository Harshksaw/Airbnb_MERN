/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { Trip } from "./Trip";
import { TripCountArgs } from "./TripCountArgs";
import { TripFindManyArgs } from "./TripFindManyArgs";
import { TripFindUniqueArgs } from "./TripFindUniqueArgs";
import { CreateTripArgs } from "./CreateTripArgs";
import { UpdateTripArgs } from "./UpdateTripArgs";
import { DeleteTripArgs } from "./DeleteTripArgs";
import { User } from "../../user/base/User";
import { TripService } from "../trip.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Trip)
export class TripResolverBase {
  constructor(
    protected readonly service: TripService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Trip",
    action: "read",
    possession: "any",
  })
  async _tripsMeta(
    @graphql.Args() args: TripCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Trip])
  @nestAccessControl.UseRoles({
    resource: "Trip",
    action: "read",
    possession: "any",
  })
  async trips(@graphql.Args() args: TripFindManyArgs): Promise<Trip[]> {
    return this.service.trips(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Trip, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Trip",
    action: "read",
    possession: "own",
  })
  async trip(@graphql.Args() args: TripFindUniqueArgs): Promise<Trip | null> {
    const result = await this.service.trip(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Trip)
  @nestAccessControl.UseRoles({
    resource: "Trip",
    action: "create",
    possession: "any",
  })
  async createTrip(@graphql.Args() args: CreateTripArgs): Promise<Trip> {
    return await this.service.createTrip({
      ...args,
      data: {
        ...args.data,

        user: {
          connect: args.data.user,
        },
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Trip)
  @nestAccessControl.UseRoles({
    resource: "Trip",
    action: "update",
    possession: "any",
  })
  async updateTrip(@graphql.Args() args: UpdateTripArgs): Promise<Trip | null> {
    try {
      return await this.service.updateTrip({
        ...args,
        data: {
          ...args.data,

          user: {
            connect: args.data.user,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Trip)
  @nestAccessControl.UseRoles({
    resource: "Trip",
    action: "delete",
    possession: "any",
  })
  async deleteTrip(@graphql.Args() args: DeleteTripArgs): Promise<Trip | null> {
    try {
      return await this.service.deleteTrip(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, {
    nullable: true,
    name: "user",
  })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async getUser(@graphql.Parent() parent: Trip): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
