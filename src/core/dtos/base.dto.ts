export abstract class BaseDtoImpl<Entity, Model> {

    abstract fromDomainToDataSingle(model: Model): Entity;

    abstract fromDataToDomainSingle(data: Entity): Model;

    fromDomainToData(model: Model | Model[]): Entity | Entity[] {
        if (Array.isArray(model)) {
            return model.map((item) => this.fromDomainToData(item)) as Entity[];
        }
        return this.fromDomainToDataSingle(model);
    }

    fromDataToDomain(data: Entity | Entity[]): Model | Model[] {
        if (Array.isArray(data)) {
            return data.map((item) => this.fromDataToDomain(item)) as Model[];
        }
        return this.fromDataToDomainSingle(data);
    }
}
