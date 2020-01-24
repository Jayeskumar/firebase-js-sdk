/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Persistence, PersistenceType } from '../../../src/core/persistence';
import { expect } from 'chai';
import { indexedDBLocalPersistence } from '../../../src/core/persistence/indexed_db';
import { User } from '../../../src/model/user';

describe('IndexedDBLocalersistence', () => {
  it('should work with persistence type', async () => {
    const persistence: Persistence = indexedDBLocalPersistence;
    const key = 'my-super-special-persistence-type';
    const value = PersistenceType.LOCAL;
    expect(await persistence.get(key)).to.be.null;
    await persistence.set(key, value);
    expect(await persistence.get(key)).to.be.eq(value);
    expect(await persistence.get('other-key')).to.be.null;
    await persistence.remove(key);
    expect(await persistence.get(key)).to.be.null;
  });

  it('should work with user', async () => {
    const persistence: Persistence = indexedDBLocalPersistence;
    const key = 'my-super-special-user';
    const value = new User('refreshToken', 'uid', 'idToken');
    expect(await persistence.get(key)).to.be.null;
    await persistence.set(key, value);
    expect(await persistence.get<User>(key)).to.include(value);
    expect(await persistence.get('other-key')).to.be.null;
    await persistence.remove(key);
    expect(await persistence.get(key)).to.be.null;
  });
});
