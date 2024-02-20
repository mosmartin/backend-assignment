import { prop, getModelForClass, ModelOptions } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "collected-fee-events" } })
class FeesCollectedEvent {
  @prop({ required: true })
  token!: string;

  @prop({ required: true })
  integrator!: string;

  @prop({ required: true })
  integratorFee!: BigInt;

  @prop({ required: true })
  lifiFee!: BigInt;

  @prop({ required: true })
  blockNumber!: bigint;
}

const FeesCollectedEventModel = getModelForClass(FeesCollectedEvent);

export default FeesCollectedEventModel;
