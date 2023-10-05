import {
  KredsAuthenticationOutcome,
  KredsStrategy,
  KredsStrategyOptions,
  KredsClientActionRedirect,KredsContext
} from '@kreds/types';

export interface MockAuthenticationStrategyConfig<TUser>
  extends KredsStrategyOptions<TUser> {
  redirectUrl: string;
  payload?: any;
}

export class MockAuthenticationStrategy<TUser> implements KredsStrategy<TUser> {
  readonly name = 'mock';

  constructor(private config: MockAuthenticationStrategyConfig<TUser>) {}

  get action(): KredsClientActionRedirect {
    return {
      type: 'redirect',
      url: this.config.redirectUrl,
    };
  }

  async authenticate(
    context: KredsContext
  ): Promise<KredsAuthenticationOutcome<TUser> | undefined> {
    if (!context.payload) {
      return undefined;
    }

    return await this.config.verify(context, this.config.payload);
  }
}
