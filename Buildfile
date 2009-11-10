# ===========================================================================
# Project:   Tiki Torch
# Copyright: ©2009 Apple Inc.
# ===========================================================================

# Configure Torch only - rest of frameworks should take care of themselves
config :torch,
  :required => :sproutcore,
  :test_required => [:core_test],
  :test_debug    => [],
  :use_modules   => true
