# ===========================================================================
# Project:   Tiki Torch
# Copyright: ©2009 Apple Inc.
# ===========================================================================

require 'extlib'
require 'fileutils'

PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
ABBOT = File.expand_path(PROJECT_ROOT / '..' / 'abbot')

########################################################
## PROJECT UPDATE/MAINTENANCE
##

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

########################################################
## BUILDING
##

def build_tiki(target_name, output_filename, mode)
  if ABBOT
    sc_build = ABBOT / 'bin' / 'sc-build'
    sc_build_number = ABBOT / 'bin' / 'sc-build-number'
  else
    sc_build = 'sc-build'
    sc_build_number = 'sc-build-number'
  end

  if (mode.to_sym != :production)
    output_filename = "#{output_filename}-#{mode}" 
  end
  
  puts `cd #{PROJECT_ROOT}; #{sc_build} #{target_name} -rcv --environment=#{mode}`

  build_number = `cd #{PROJECT_ROOT}; #{sc_build_number} #{target_name} --environment=#{mode}`
  
  parts = target_name.to_s.split('/')
  src_root = File.join(PROJECT_ROOT, 'tmp', mode.to_s, 'build', 'static', parts, 'en', build_number)
  dst_root = PROJECT_ROOT / 'tmp' / 'tiki'

  src_path = src_root / 'javascript-packed.js'
  dst_path = dst_root / "#{output_filename}.js"

  FileUtils.mkdir_p(dst_root)
  FileUtils.cp(src_path, dst_path)
end
  
namespace :build do 
  
  namespace :tiki do

    desc "builds all known versions of tiki"
    task :all => ['build:tiki:system', 'build:tiki:system_debug', 'build:tiki:core', 'build:tiki:core_debug']

    task :clean do
      `rm -r #{PROJECT_ROOT/'tmp'/'tiki'}`
    end
    
    desc "builds a version of tiki for release."
    task :system, [:mode] do |t, args|
      args.with_defaults(:mode => :production)
      build_tiki('tiki/system', "tiki", args.mode)
    end

    task :system_debug do
      build_tiki('tiki/system', 'tiki', :debug)
    end
    
    desc "builds a version of tiki with only the core loader"
    task :core, [:mode] do |t, args|
      args.with_defaults(:mode => :production)
      build_tiki('tiki', "tiki-core", args.mode)
    end

    task :core_debug do
      build_tiki('tiki', 'tiki-core', :debug)
    end

  end
end


