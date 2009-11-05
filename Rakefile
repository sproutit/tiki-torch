# ===========================================================================
# Project:   Tiki Torch
# Copyright: ©2009 Apple Inc.
# ===========================================================================

require 'extlib'
PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))

FRAMEWORKS = {
  'tiki' => 'git://github.com/sproutit/sproutcore-tiki.git',
  'core_test' => 'git://github.com/sproutit/core_test.git'
}

desc "Checkout any required frameworks"
task :init do
  
  require 'fileutils'
  FileUtils.mkdir_p(PROJECT_ROOT / 'frameworks')
  
  FRAMEWORKS.each do |name, clone_url|
    puts "init: #{name} => #{clone_url}"
    
    path = PROJECT_ROOT / 'frameworks' / name
    FileUtils.mkdir_p(path) if !File.exist?(path)
    throw "#{"frameworks" / name} cannot be a file" if !File.directory?(path)
    
    # clone if needed...
    if !File.exist?(path / '.git')
      puts ">> git clone #{clone_url} #{path}" 
      puts `git clone #{clone_url} #{path}`
    end
  end
  
end

desc "update all git repositories"
task :pull do
  `cd #{PROJECT_ROOT}; git pull`
  FRAMEWORKS.each do |name, clone_url|
    path = PROJECT_ROOT / 'frameworks' / name
    `cd #{path}; git pull`
  end
end

  