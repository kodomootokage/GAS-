export namespace messages {
  export namespace error {
    export const project_key = 'プロジェクトキーが正しくありません。';
  }
  export namespace common {
    export const end = '終了しました。';
  }
}

export const Message = {
  findByKey: (key: string, locale: string): string => messages[key][locale]
};
