#!/bin/bash
name="$1"
role="$2"
mkdir -p "users/$name/$role"
echo "Carpetas creadas para $name como $role"
