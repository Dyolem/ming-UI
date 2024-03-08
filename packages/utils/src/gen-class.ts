type Modifier = string | { [key: string]: boolean }
type Modifiers = Modifier | Modifier[]

export default class BEM {
  constructor(private block: string) {}

  // 生成基于Block的类名
  b(): string {
    return this.block
  }

  // 生成基于Element的类名
  e(element: string): string {
    return `${this.block}__${element}`
  }

  // 生成基于Modifier的类名
  m(modifier: Modifiers, base: string = this.block): string {
    if (!modifier)
      return base

    const addModifier = (mod: string) => `${base}--${mod}`

    if (typeof modifier === 'string')
      return addModifier(modifier)
    else if (Array.isArray(modifier))
      return modifier.map(mod => typeof mod === 'string' ? addModifier(mod) : this.m(Object.entries(mod).filter(([_, value]) => value).map(([key, _]) => key), base)).join(' ')
    else
      return Object.entries(modifier).filter(([_, value]) => value).map(([key, _]) => addModifier(key)).join(' ')
  }

  // 组合Block, Element和Modifier生成类名
  generate(element?: string, modifier?: Modifiers): string {
    const base = element ? this.e(element) : this.b()
    // 确保modifier不为undefined，如果是undefined则作为一个空数组传递
    return this.m(modifier ?? [], base)
  }
}

// // 使用示例
// const buttonBEM = new BEM('button')

// console.log(buttonBEM.b()) // "button"
// console.log(buttonBEM.e('icon')) // "button__icon"
// console.log(buttonBEM.m('active')) // "button--active"
// console.log(buttonBEM.generate('icon', 'right')) // "button__icon button__icon--right"
// console.log(buttonBEM.generate(undefined, ['disabled', { primary: true }])) // "button button--disabled button--primary"
