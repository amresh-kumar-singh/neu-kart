import idGenerator from "#main/utils/idGenerator/index";

const generator = idGenerator();

export default function () {
  return `user-${generator.next().value}`;
}
