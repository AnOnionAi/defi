<script lang="ts">
import { _ } from 'svelte-i18n';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import Icon from 'svelte-fa';
import { darkMode } from '$lib/stores/dark';
import {accounts} from "$lib/stores/MetaMaskAccount"

type MetamaskExtensionStatus = "checking" | "isInstalled" 
let isInstalled = 'checking';

</script>


<button class="bg-green-400">
    <p>Status</p>
</button>

<!-- <button
disabled={isInstalled == 'checking' || $accounts}
on:click={metaMaskCon}
                                class="hover:bg-none flex rounded-lg {$accounts && 'cursor-default bg-green-400'}"
                            >
                                <span
                                    class="dark:text-white {$darkMode &&
                                        'dark:hover:bg-green-400'}  block hover:bg-gray-200 {isInstalled == 'checking' &&
                                        'cursor-default hover:bg-transparent'} {$accounts &&
                                        'hover:bg-transparent connected'} pl-2 pr-1 text-dark-800 py-2 mr-1 rounded-lg font-medium hover:no-underline no-underline"
                                >
                                    {#if isInstalled == 'checking'}
                                        {$_('walletStatus.checking')}
                                    {:else if $accounts}
                                        {$_('walletStatus.connected')}
                                    {:else if isInstalled == 'isInstalled'}
                                        {$_('walletStatus.wallet')}
                                    {:else}
                                        <a
                                            target="blank"
                                            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                                        >
                                            Install Metamask
                                        </a>
                                    {/if}
                                </span>
                                <span
                                    class="{$accounts ? 'bg-green-400' : 'bg-gray-300'} m-auto pr-2 rounded-1 inline-flex"
                                >
                                    {#if isDark}
                                        <Icon icon={faWallet} color="#fff" />
                                    {:else}
                                        <Icon icon={faWallet} color="#000" />
                                    {/if}
                                </span>
					</button> -->