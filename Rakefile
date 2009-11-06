# ===========================================================================
# Project:   Tiki Torch
# Copyright: ©2009 Apple Inc.
# ===========================================================================

require 'extlib'
PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))

FRAMEWORKS = {
  'tiki' => {
    :visitor => 'git://github.com/sproutit/tiki.git',
    :owner   => 'git@github.com:sproutit/tiki.git'
  },
  
  'core_test' => {
    :visitor => 'git://github.com/sproutit/core_test.git',
    :owner   => 'git@github.com:sproutit/core_test.git'
  },
  
  'sproutcore' => {
    :visitor => 'git://github.com/sproutit/sproutcore.git',
    :owner   => 'git@github.com:sproutit/sproutcore.git'
  }
  
}



desc "Checkout any required frameworks"
task :init, [:mode] do |t, args|
  
  args.with_defaults(:mode => :visitor)
  mode = args.mode.to_sym
  
  require 'fileutils'
  FileUtils.mkdir_p(PROJECT_ROOT / 'frameworks')
  
  FRAMEWORKS.each do |name, clone_url|
    clone_url = clone_url[mode]
    throw "mode=#{mode} is not supported for #{name}" if clone_url.nil?
    
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

  
desc "show status of all git repositories"
task :status do
  puts "#{PROJECT_ROOT}:"
  puts `cd #{PROJECT_ROOT}; git status`
  puts "\n"

  FRAMEWORKS.each do |name, clone_url|
    path = PROJECT_ROOT / 'frameworks' / name
    puts "#{path}:"
    puts `cd #{path}; git status`
    puts "\n"
  end
end
