import idGenerator from "#main/utils/idGenerator/index";
const generator = idGenerator();

export default function ordersIdGenerator() {
  return `order-${generator.next().value}`;
}
