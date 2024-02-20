import {
  prop,
  getModelForClass,
  ModelOptions,
  index,
} from "@typegoose/typegoose";

@index({ blockNumber: 1 }, { unique: true })
@ModelOptions({
  schemaOptions: { collection: "collected-fee-events", timestamps: true },
})
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
