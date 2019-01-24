import { FileUtils } from '../../src/utils/fileutils';
it('reads a list of subdirectories from a directory', () => {
    const subdirectories = FileUtils.getSubDirectories('../../workspacePWCGGradle/PWCGCampaign/Campaigns');

    expect(subdirectories.length == 4);
  });

  it('reads a list of subdirectories from a directory', () => {
    const subdirectories = FileUtils.getSubDirectories('../../workspacePWCGGradle/PWCGCampaign/Campaigns');
    subdirectories.forEach(function (value) {
        console.log(value);
    });
    expect(subdirectories.length == 4);
  });

  it('reads a list of json files from a directory', () => {
    const subdirectories = FileUtils.getSubDirectories('../../workspacePWCGGradle/PWCGCampaign/Campaigns');
    subdirectories.forEach(function (value) {
        console.log(value);
    });
    expect(subdirectories.length == 4);
  });