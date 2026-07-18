export abstract class Entity {
  constructor(
    readonly id: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}
