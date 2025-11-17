// types/postcss-rem.d.ts
declare module 'postcss-rem' {
  // 若知道插件的具体配置类型，可补充完整（如下示例），不确定则留空对象即可
  interface PostcssRemOptions {
    rootValue?: number; // 根元素字体大小（默认通常是 16）
    unitPrecision?: number; // 转换精度
    propList?: string[]; // 需要转换的属性
    selectorBlackList?: string[]; // 不需要转换的选择器
    replace?: boolean; // 是否替换原属性
    mediaQuery?: boolean; // 是否在媒体查询中转换
    minPixelValue?: number; // 最小像素值（小于该值不转换）
  }

  // 导出插件函数类型
  const postcssRem: (options?: PostcssRemOptions) => any;
  export default postcssRem;
}