import 'tsarch/dist/jest';
import { filesOfProject } from 'tsarch';

describe('architecture', () => {
    jest.setTimeout(60000);

    it('application layer should only depend on the domain and infrastructure layers', async () => {
        const rule = filesOfProject()
            .inFolder('src/application')
            .shouldNot()
            .dependOnFiles()
            .inFolder('src/infrastructure');

        await expect(rule).toPassAsync();
    });

    it('command layer should depend on application and domain layers', async () => {
        const rule = filesOfProject()
            .inFolder('src/command')
            .shouldNot()
            .dependOnFiles()
            .inFolder('src/infrastructure');

        await expect(rule).toPassAsync();
    });

    it('domain layer should not depend on application layer', async () => {
        const rule = filesOfProject().inFolder('src/domain').shouldNot().dependOnFiles().inFolder('src/application');

        await expect(rule).toPassAsync();
    });

    it('domain layer should not depend on infrastructure layer', async () => {
        const rule = filesOfProject().inFolder('src/domain').shouldNot().dependOnFiles().inFolder('src/infrastructure');

        await expect(rule).toPassAsync();
    });

    it('domain layer should not depend on external libraries', async () => {
        const rule = filesOfProject().inFolder('src/domain').shouldNot().dependOnFiles().inFolder('node_modules');

        await expect(rule).toPassAsync();
    });

    it('infrastructure layer can depend on the domain layer', async () => {
        const rule = filesOfProject()
            .inFolder('src/infrastructure')
            .shouldNot()
            .dependOnFiles()
            .inFolder('src/application');

        await expect(rule).toPassAsync();
    });

    it('tests can depend on any layer', async () => {
        const rule = filesOfProject().inFolder('src/tests').should().beFreeOfCycles();

        await expect(rule).toPassAsync();
    });
});
