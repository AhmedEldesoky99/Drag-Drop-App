export function autoBind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundedFn = originalMethod.bind(this);
      return boundedFn;
    },
  };

  return adjustedDescriptor;
}
